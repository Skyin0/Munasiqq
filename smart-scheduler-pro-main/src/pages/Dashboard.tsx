import { useState, useRef, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen, Calendar, BarChart3, Bell, Moon, Sun, Globe,
  Settings, User, LogOut, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle2, Clock, Activity, ChevronDown
} from "lucide-react";
import PressureCenter from "./PressureCenter";

const COURSES_AR = [
  { id: "CS301", name: "هياكل البيانات", tasks: 3, nextDeadline: "2026-04-20", workload: "high" },
  { id: "CS302", name: "قواعد البيانات", tasks: 2, nextDeadline: "2026-04-22", workload: "medium" },
  { id: "MATH201", name: "الرياضيات المتقدمة", tasks: 1, nextDeadline: "2026-04-25", workload: "low" },
  { id: "ENG101", name: "اللغة الإنجليزية", tasks: 2, nextDeadline: "2026-04-21", workload: "medium" },
  { id: "IS201", name: "نظم المعلومات", tasks: 1, nextDeadline: "2026-04-28", workload: "low" },
];

const COURSES_EN = [
  { id: "CS301", name: "Data Structures", tasks: 3, nextDeadline: "2026-04-20", workload: "high" },
  { id: "CS302", name: "Databases", tasks: 2, nextDeadline: "2026-04-22", workload: "medium" },
  { id: "MATH201", name: "Advanced Math", tasks: 1, nextDeadline: "2026-04-25", workload: "low" },
  { id: "ENG101", name: "English Language", tasks: 2, nextDeadline: "2026-04-21", workload: "medium" },
  { id: "IS201", name: "Information Systems", tasks: 1, nextDeadline: "2026-04-28", workload: "low" },
];

const CALENDAR_EVENTS = [
  { date: 16, type: "assignment", label_ar: "تسليم واجب CS301", label_en: "CS301 Assignment Due" },
  { date: 18, type: "exam", label_ar: "اختبار قصير MATH201", label_en: "MATH201 Quiz" },
  { date: 20, type: "assignment", label_ar: "مشروع CS301", label_en: "CS301 Project" },
  { date: 20, type: "assignment", label_ar: "واجب CS302", label_en: "CS302 Assignment" },
  { date: 21, type: "exam", label_ar: "اختبار ENG101", label_en: "ENG101 Exam" },
  { date: 22, type: "assignment", label_ar: "تقرير CS302", label_en: "CS302 Report" },
];

type Tab = "dashboard" | "pressure" | "profile" | "settings";

const Dashboard = () => {
  const { t, language, setLanguage, theme, setTheme, setIsLoggedIn, setUser, user } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [logoMenuOpen, setLogoMenuOpen] = useState(false);
  const logoMenuRef = useRef<HTMLDivElement>(null);
  const courses = language === "ar" ? COURSES_AR : COURSES_EN;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (logoMenuRef.current && !logoMenuRef.current.contains(e.target as Node)) {
        setLogoMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const workloadColor = (w: string) =>
    w === "high" ? "bg-danger/15 text-danger border-danger/30" :
    w === "medium" ? "bg-warning/15 text-warning border-warning/30" :
    "bg-success/15 text-success border-success/30";

  const workloadLabel = (w: string) =>
    w === "high" ? t("ضغط عالي", "High") :
    w === "medium" ? t("ضغط متوسط", "Medium") :
    t("ضغط منخفض", "Low");

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const daysInMonth = 30;
  const firstDay = 2; // April 2026 starts on Wednesday (0=Sun)
  const today = 16;

  const congestionDays = [20, 21]; // days with multiple deadlines

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <div className="relative" ref={logoMenuRef}>
            <button
              onClick={() => setLogoMenuOpen(!logoMenuOpen)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground">{t("منسّق", "Munassiq")}</span>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${logoMenuOpen ? "rotate-180" : ""}`} />
            </button>
            {logoMenuOpen && (
              <div className="absolute top-full mt-2 start-0 w-56 bg-card border border-border rounded-lg shadow-xl z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                {([
                  { key: "dashboard" as Tab, icon: BarChart3, label: t("الرئيسية", "Dashboard") },
                  { key: "pressure" as Tab, icon: Activity, label: t("مركز الضغط", "Pressure Center") },
                  { key: "profile" as Tab, icon: User, label: t("الملف الشخصي", "Profile") },
                  { key: "settings" as Tab, icon: Settings, label: t("الإعدادات", "Settings") },
                ]).map((item) => (
                  <button
                    key={item.key}
                    onClick={() => { setActiveTab(item.key); setLogoMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      activeTab === item.key
                        ? "bg-accent/10 text-accent font-medium"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {([
              { key: "dashboard" as Tab, icon: BarChart3, label: t("الرئيسية", "Dashboard") },
              { key: "pressure" as Tab, icon: Activity, label: t("مركز الضغط", "Pressure Center") },
              { key: "profile" as Tab, icon: User, label: t("الملف الشخصي", "Profile") },
              { key: "settings" as Tab, icon: Settings, label: t("الإعدادات", "Settings") },
            ]).map((item) => (
              <Button
                key={item.key}
                variant={activeTab === item.key ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(item.key)}
                className="gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative" title={t("الإشعارات", "Notifications")}>
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 end-1 w-2 h-2 bg-danger rounded-full" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setLanguage(language === "ar" ? "en" : "ar")}>
              <Globe className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout} title={t("تسجيل الخروج", "Sign Out")}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex border-t border-border">
          {([
            { key: "dashboard" as Tab, icon: BarChart3, label: t("الرئيسية", "Home") },
            { key: "pressure" as Tab, icon: Activity, label: t("الضغط", "Pressure") },
            { key: "profile" as Tab, icon: User, label: t("الملف", "Profile") },
            { key: "settings" as Tab, icon: Settings, label: t("الإعدادات", "Settings") },
          ]).map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-xs transition-colors ${
                activeTab === item.key ? "text-accent" : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <main className="container mx-auto p-4 max-w-7xl">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Welcome + Alert */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {t(`مرحبًا، ${user?.name || "طالب"} 👋`, `Welcome, ${user?.name || "Student"} 👋`)}
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  {t("إليك ملخص عبئك الأكاديمي لهذا الأسبوع", "Here's your academic workload summary for this week")}
                </p>
              </div>
            </div>

            {/* Congestion Alert */}
            <Card className="border-danger/30 bg-danger/5">
              <CardContent className="flex items-start gap-3 py-4">
                <AlertTriangle className="h-5 w-5 text-danger mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {t("⚠️ تنبيه تكدس!", "⚠️ Congestion Alert!")}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {t(
                      "يوجد تكدس في الفترة 20-21 أبريل: 3 تسليمات + اختبار. ننصح بالبدء مبكرًا.",
                      "Congestion detected on Apr 20-21: 3 assignments + 1 exam. We recommend starting early."
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Stats cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: BookOpen, value: "5", label: t("مقررات", "Courses"), color: "text-accent" },
                { icon: Clock, value: "9", label: t("مهام قادمة", "Upcoming Tasks"), color: "text-warning" },
                { icon: AlertTriangle, value: "2", label: t("أيام تكدس", "Congestion Days"), color: "text-danger" },
                { icon: CheckCircle2, value: "73%", label: t("نسبة الإنجاز", "Completion"), color: "text-success" },
              ].map((stat, i) => (
                <Card key={i} className="gradient-card">
                  <CardContent className="pt-5 pb-4">
                    <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Courses */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-lg font-semibold text-foreground">{t("المقررات", "Courses")}</h2>
                <div className="space-y-3">
                  {courses.map((course) => (
                    <Card key={course.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{course.name}</p>
                            <p className="text-xs text-muted-foreground">{course.id} · {course.tasks} {t("مهام", "tasks")}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={workloadColor(course.workload)}>
                          {workloadLabel(course.workload)}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Calendar */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">{t("التقويم - أبريل 2026", "Calendar - April 2026")}</h2>
                <Card>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                      {(language === "ar"
                        ? ["أحد", "اثن", "ثلا", "أرب", "خمي", "جمع", "سبت"]
                        : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                      ).map((d) => (
                        <span key={d} className="text-muted-foreground font-medium py-1">{d}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`e-${i}`} />
                      ))}
                      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                        const hasEvent = CALENDAR_EVENTS.some((e) => e.date === day);
                        const isCongestion = congestionDays.includes(day);
                        const isToday = day === today;
                        return (
                          <button
                            key={day}
                            className={`h-8 w-full rounded-md text-xs font-medium transition-colors relative
                              ${isToday ? "gradient-primary text-primary-foreground" : ""}
                              ${isCongestion && !isToday ? "bg-danger/15 text-danger font-bold" : ""}
                              ${hasEvent && !isCongestion && !isToday ? "bg-accent/10 text-accent" : ""}
                              ${!hasEvent && !isToday ? "text-foreground hover:bg-muted" : ""}
                            `}
                          >
                            {day}
                            {hasEvent && (
                              <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isCongestion ? "bg-danger" : "bg-accent"}`} />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Events list */}
                    <div className="mt-4 space-y-2 border-t border-border pt-3">
                      <p className="text-xs font-semibold text-muted-foreground">{t("الأحداث القادمة", "Upcoming Events")}</p>
                      {CALENDAR_EVENTS.slice(0, 4).map((ev, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${ev.type === "exam" ? "bg-danger" : "bg-accent"}`} />
                          <span className="text-foreground">{language === "ar" ? ev.label_ar : ev.label_en}</span>
                          <span className="text-muted-foreground ms-auto">{ev.date} {t("أبريل", "Apr")}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === "pressure" && (
          <PressureCenter onBack={() => setActiveTab("dashboard")} />
        )}

        {activeTab === "profile" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-foreground">{t("الملف الشخصي", "Profile")}</h1>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                    <User className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">{user?.name || t("طالب", "Student")}</p>
                    <p className="text-sm text-muted-foreground">{t("الرقم الجامعي:", "University ID:")} {user?.id}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: t("الاسم الرباعي", "Full Name"), value: user?.name || t("عبدالله محمد أحمد القحطاني", "Abdullah Mohammed Ahmed Al-Qahtani") },
                    { label: t("الرقم الجامعي", "University ID"), value: user?.id || "443001234" },
                    { label: t("الكلية", "College"), value: t("كلية الحاسب الآلي", "College of Computer Science") },
                    { label: t("التخصص", "Major"), value: t("علوم الحاسب", "Computer Science") },
                    { label: t("المستوى", "Level"), value: t("المستوى السادس", "Level 6") },
                    { label: t("المعدل التراكمي", "GPA"), value: "3.75 / 4.00" },
                    { label: t("البريد الجامعي", "Email"), value: `${user?.id || "443001234"}@university.edu.sa` },
                    { label: t("عدد المقررات", "Courses"), value: "5" },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-foreground text-sm mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-foreground">{t("الإعدادات", "Settings")}</h1>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-foreground text-sm">{t("الوضع الليلي", "Dark Mode")}</p>
                    <p className="text-xs text-muted-foreground">{t("تفعيل المظهر الداكن", "Enable dark appearance")}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4 me-1" /> : <Moon className="h-4 w-4 me-1" />}
                    {theme === "dark" ? t("فاتح", "Light") : t("داكن", "Dark")}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-foreground text-sm">{t("اللغة", "Language")}</p>
                    <p className="text-xs text-muted-foreground">{t("تغيير لغة الواجهة", "Change interface language")}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
                  >
                    <Globe className="h-4 w-4 me-1" />
                    {language === "ar" ? "English" : "العربية"}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-foreground text-sm">{t("الإشعارات", "Notifications")}</p>
                    <p className="text-xs text-muted-foreground">{t("تنبيهات التكدس والمواعيد", "Congestion and deadline alerts")}</p>
                  </div>
                  <Badge className="bg-success/15 text-success border-success/30">{t("مفعّل", "Enabled")}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
