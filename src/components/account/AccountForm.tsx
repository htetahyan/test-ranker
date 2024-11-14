"use client";
import React, { Key } from "react";
import { Tabs, Tab, Input, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAccountMutation } from "@/quries/AccoutQuery";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FcGoogle } from 'react-icons/fc';  // Import Google Icon
import { getGoogleOAuthURL } from "@/utils/authActions";
import Logo from '@/assets/logo.png'
import Background from '@/assets/background.jpg'
import Image from "next/image";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  type: Yup.string(),
  name: Yup.string().when("type", {
    is: (val: string) => val === "signup",
    then: () => Yup.string().required("Name is required"),
  }),
  confirmPassword: Yup.string().when("type", {
    is: (val: string) => val === "signup",
    then: () => Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    otherwise: () => Yup.string().nullable(),
  }),
});

const AccountForm = ({ callbackUrl }: { callbackUrl: string }) => {
  const [selected, setSelected] = React.useState<any>("login");
  const router = useRouter();
  
  const [mutate, { isLoading }] = useAccountMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      type: selected,
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const res = await mutate(values).unwrap();
      if (res.redirect) {
        callbackUrl ? router.push(callbackUrl) : router.push('/dashboard');
      }
    },
  });

  const handleTabChange = (key: Key) => {
    setSelected(key);
    formik.setFieldValue("type", key);
  };

  return (
    <div className="flex flex-col w-full min-h-screen items-center bg-gray-50 justify-center relative">
      <Image src={Background} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black opacity-30"></div>  {/* Background overlay for contrast */}
      <Card className="w-full max-w-lg mx-4 sm:mx-auto p-6 sm:p-8 bg-white shadow-xl relative m-2 z-10">
        <CardHeader className="flex justify-center mb-4">
          <Image src={Logo} alt="Logo" width={200} height={100} />
        </CardHeader>
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={handleTabChange}
          >
            <Tab key="login" title="Login">
              <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  errorMessage={formik.errors.email && formik.touched.email ? formik.errors.email : ""}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  errorMessage={formik.errors.password && formik.touched.password ? formik.errors.password : ""}
                />
                <div className="flex gap-2 justify-end">
                  <Button fullWidth type="submit">
                    Login
                  </Button>
                </div>
                <Button onClick={getGoogleOAuthURL} startContent={<FcGoogle />} fullWidth color="secondary" className="flex items-center justify-center gap-2">
                  Sign in with Google
                </Button>
              </form>
            </Tab>

            <Tab key="signup" title="Sign up">
              <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="Name"
                  placeholder="Enter your name"
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  errorMessage={formik.errors.name && formik.touched.name ? formik.errors.name : ""}
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  errorMessage={formik.errors.email && formik.touched.email ? formik.errors.email : ""}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  errorMessage={formik.errors.password && formik.touched.password ? formik.errors.password : ""}
                />
                <Input
                  isRequired
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  type="password"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  errorMessage={formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : ""}
                />
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit">
                    Sign up
                  </Button>
                </div>
                <Button onClick={getGoogleOAuthURL} fullWidth color="secondary" className="flex items-center justify-center gap-2">
                  <FcGoogle />
                  Sign up with Google
                </Button>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default AccountForm;
