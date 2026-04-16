import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GraduationCap, Eye, EyeOff, Globe } from "lucide-react";

const Login = () => {
  const { t, setIsLoggedIn, setUser, language, setLanguage } = useApp();
  const [universityId, setUniversityId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!universityId || !password) {
      setError(t("يرجى تعبئة جميع الحقول", "Please fill in all fields"));
      return;
    }
    if (universityId.length < 5) {
      setError(t("الرقم الجامعي غير صحيح", "Invalid university ID"));
      return;
    }
    if (!/^\d{6,}$/.test(password)) {
      setError(t("كلمة المرور يجب أن تكون 6 أرقام على الأقل", "Password must be at least 6 digits"));
      return;
    }
    setUser({ id: universityId, name: t("عبدالله محمد أحمد القحطاني", "Abdullah Mohammed Ahmed Al-Qahtani") });
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Language toggle */}
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
            className="text-muted-foreground"
          >
            <Globe className="h-4 w-4 me-1" />
            {language === "ar" ? "EN" : "عربي"}
          </Button>
        </div>

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="text-center pb-2 pt-8">
            <div className="mx-auto w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-lg">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">{t("منسّق", "Munassiq")}</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {t("نظام تنسيق العبء الأكاديمي", "Academic Workload Coordinator")}
            </p>
          </CardHeader>
          <CardContent className="px-6 pb-8">
            {!showForgot ? (
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="uid">{t("الرقم الجامعي", "University ID")}</Label>
                  <Input
                    id="uid"
                    placeholder={t("أدخل الرقم الجامعي", "Enter your university ID")}
                    value={universityId}
                    onChange={(e) => setUniversityId(e.target.value)}
                    className="h-11"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pass">{t("كلمة المرور", "Password")}</Label>
                  <div className="relative">
                    <Input
                      id="pass"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("أدخل كلمة المرور", "Enter your password")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pe-10"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 -translate-y-1/2 end-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-md">{error}</p>
                )}

                <Button type="submit" className="w-full h-11 gradient-primary text-primary-foreground font-semibold shadow-md hover:opacity-90 transition-opacity">
                  {t("تسجيل الدخول", "Sign In")}
                </Button>

                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="w-full text-center text-sm text-accent hover:underline"
                >
                  {t("هل نسيت كلمة المرور؟", "Forgot your password?")}
                </button>
              </form>
            ) : (
              <div className="space-y-4 mt-4">
                <p className="text-sm text-muted-foreground">
                  {t(
                    "أدخل رقمك الجامعي وسنرسل لك رابط إعادة تعيين كلمة المرور على بريدك الجامعي.",
                    "Enter your university ID and we'll send a password reset link to your university email."
                  )}
                </p>
                <div className="space-y-2">
                  <Label>{t("الرقم الجامعي", "University ID")}</Label>
                  <Input
                    placeholder={t("أدخل الرقم الجامعي", "Enter your university ID")}
                    dir="ltr"
                    className="h-11"
                  />
                </div>
                <Button className="w-full h-11 gradient-primary text-primary-foreground font-semibold">
                  {t("إرسال رابط الاستعادة", "Send Reset Link")}
                </Button>
                <button
                  type="button"
                  onClick={() => setShowForgot(false)}
                  className="w-full text-center text-sm text-accent hover:underline"
                >
                  {t("العودة لتسجيل الدخول", "Back to Sign In")}
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
