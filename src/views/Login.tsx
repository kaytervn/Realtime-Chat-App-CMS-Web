import { LockIcon, MailIcon } from "lucide-react";
import InputField from "../components/InputField";
import { useState } from "react";
import useForm from "../hooks/useForm";
import { ToastContainer, toast } from "react-toastify";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { LoadingDialog } from "../components/Dialog";
import useFetch from "../hooks/useFetch";

const Login = () => {
  const navigate = useNavigate();
  const { post, loading } = useFetch();
  const [showPassword, setShowPassword] = useState(false);

  const validate = (form: any) => {
    const newErrors: any = {};
    if (!form.email.trim()) {
      newErrors.email = "Email không được bỏ trống";
    }
    if (!form.password) {
      newErrors.password = "Mật khẩu không được bỏ trống";
    }
    return newErrors;
  };

  const { form, errors, handleChange, isValidForm } = useForm(
    { email: "", password: "" },
    { email: "", password: "" },
    validate
  );

  const handleSubmit = async () => {
    if (isValidForm()) {
      const res = await post("/v1/user/login", form);
      if (res.result) {
        await localStorage.setItem("accessToken", res.data.accessToken);
        toast.success("Đăng nhập thành công");
        window.location.reload();
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>
        <InputField
          title="Email đăng nhập"
          isRequire={true}
          placeholder="Nhập địa chỉ email"
          onChangeText={(value: any) => handleChange("email", value)}
          value={form.email}
          icon={MailIcon}
          error={errors.email}
        />
        <InputField
          title="Mật khẩu"
          isRequire={true}
          placeholder="Nhập mật khẩu"
          onChangeText={(value: any) => handleChange("password", value)}
          value={form.password}
          icon={LockIcon}
          secureTextEntry={!showPassword}
          togglePassword={() => setShowPassword(!showPassword)}
          showPassword={showPassword}
          error={errors.password}
        />
        <Button title="ĐĂNG NHẬP" color="royalblue" onPress={handleSubmit} />
      </div>
      <LoadingDialog isVisible={loading} />
      <ToastContainer />
    </div>
  );
};

export default Login;