import { useApp } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend
} from "recharts";

const PressureCenter = ({ onBack }: { onBack: () => void }) => {
  const { t, language } = useApp();

  const weeklyPressure = [
    { day: t("أحد", "Sun"), pressure: 2, max: 5 },
    { day: t("اثنين", "Mon"), pressure: 4, max: 5 },
    { day: t("ثلاثاء", "Tue"), pressure: 3, max: 5 },
    { day: t("أربعاء", "Wed"), pressure: 5, max: 5 },
    { day: t("خميس", "Thu"), pressure: 5, max: 5 },
    { day: t("جمعة", "Fri"), pressure: 1, max: 5 },
    { day: t("سبت", "Sat"), pressure: 2, max: 5 },
  ];

  const gradesData = [
    { course: t("هياكل البيانات", "Data Structures"), grade: 85, avg: 72 },
    { course: t("قواعد البيانات", "Databases"), grade: 91, avg: 78 },
    { course: t("رياضيات", "Math"), grade: 76, avg: 68 },
    { course: t("إنجليزي", "English"), grade: 88, avg: 80 },
    { course: t("نظم معلومات", "Info Systems"), grade: 92, avg: 75 },
  ];

  const submissionCongestion = [
    { week: t("أسبوع 1", "Week 1"), submissions: 2, exams: 0 },
    { week: t("أسبوع 2", "Week 2"), submissions: 3, exams: 1 },
    { week: t("أسبوع 3", "Week 3"), submissions: 5, exams: 2 },
    { week: t("أسبوع 4", "Week 4"), submissions: 1, exams: 0 },
    { week: t("أسبوع 5", "Week 5"), submissions: 4, exams: 1 },
    { week: t("أسبوع 6", "Week 6"), submissions: 6, exams: 3 },
    { week: t("أسبوع 7", "Week 7"), submissions: 2, exams: 1 },
    { week: t("أسبوع 8", "Week 8"), submissions: 3, exams: 0 },
  ];

  const pressureDistribution = [
    { name: t("ضغط عالي", "High"), value: 30, color: "hsl(var(--danger))" },
    { name: t("ضغط متوسط", "Medium"), value: 45, color: "hsl(var(--warning))" },
    { name: t("ضغط منخفض", "Low"), value: 25, color: "hsl(var(--success))" },
  ];

  const monthlyTrend = [
    { month: t("يناير", "Jan"), pressure: 3.2 },
    { month: t("فبراير", "Feb"), pressure: 3.8 },
    { month: t("مارس", "Mar"), pressure: 4.1 },
    { month: t("أبريل", "Apr"), pressure: 4.7 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {t("مركز الضغط", "Pressure Center")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("تحليل شامل للضغط الأكاديمي والدرجات وازدحام التسليمات", "Comprehensive analysis of academic pressure, grades, and submission congestion")}
          </p>
        </div>
      </div>

      {/* Row 1: Weekly Pressure + Pressure Distribution */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">{t("الضغط الأسبوعي", "Weekly Pressure")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyPressure} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis dataKey="day" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <YAxis domain={[0, 5]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Bar dataKey="pressure" name={t("مستوى الضغط", "Pressure Level")} radius={[6, 6, 0, 0]} fill="hsl(var(--accent))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("توزيع الضغط", "Pressure Distribution")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pressureDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pressureDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend
                    formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Grades Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("الدرجات مقارنة بالمعدل", "Grades vs Class Average")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradesData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                <XAxis dataKey="course" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="grade" name={t("درجتك", "Your Grade")} radius={[4, 4, 0, 0]} fill="hsl(var(--accent))" />
                <Bar dataKey="avg" name={t("معدل الفصل", "Class Average")} radius={[4, 4, 0, 0]} fill="hsl(var(--muted-foreground))" opacity={0.5} />
                <Legend formatter={(value) => <span className="text-xs">{value}</span>} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Row 3: Submission Congestion + Monthly Trend */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("ازدحام التسليمات والاختبارات", "Submission & Exam Congestion")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={submissionCongestion}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis dataKey="week" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area type="monotone" dataKey="submissions" name={t("تسليمات", "Submissions")} stackId="1" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="exams" name={t("اختبارات", "Exams")} stackId="1" stroke="hsl(var(--danger))" fill="hsl(var(--danger))" fillOpacity={0.3} />
                  <Legend formatter={(value) => <span className="text-xs">{value}</span>} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("اتجاه الضغط الشهري", "Monthly Pressure Trend")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <YAxis domain={[0, 5]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="pressure"
                    name={t("مستوى الضغط", "Pressure Level")}
                    stroke="hsl(var(--warning))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--warning))", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PressureCenter;
