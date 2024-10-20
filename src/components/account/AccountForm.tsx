"use client";
import React, { Key } from "react";
import { Tabs, Tab, Input, Button, Card, CardBody } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAccountMutation } from "@/quries/AccoutQuery";
import { useRouter } from "next/navigation";
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  type: Yup.string(),
  name: Yup.string().when("type", {
    is: (val: string) => val === "signup",
    then:()=> Yup.string().required("Name is required"),
   
  }),
  confirmPassword: Yup.string().when("type", {
    is: (val: string) => val === "signup",
    then:()=> Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    otherwise:()=> Yup.string().nullable(),
  }),
});


const AccountForm=()=> {
  const [selected, setSelected] = React.useState<any>("login");
  const router=useRouter()
  
const [mutate,{isLoading}]=useAccountMutation()
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      type: selected,
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    validateOnChange: true, // This ensures that validation runs on field changes
    validateOnBlur: true,
    onSubmit: async(values) => {
      const res=await mutate(values).unwrap()
      if(res.redirect){
        router.push('/dashboard')
      }
    },
  });

  // Update formik's type field when the tab changes
  const handleTabChange = (key: Key) => {
    setSelected(key);
    formik.setFieldValue("type", key);
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <Card className="max-w-full w-[500px] h-fit">
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
                  onBlur={formik.handleBlur} // Handles validation on blur
                  value={formik.values.email}
                  errorMessage={formik.errors.email && formik.touched.email ? formik.errors.email : ""}
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="text-red-500">{formik.errors.email}</div>
                )}
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} // Handles validation on blur
                  value={formik.values.password}
                  errorMessage={formik.errors.password && formik.touched.password ? formik.errors.password : ""}
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="text-red-500">{formik.errors.password}</div>
                )}
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit">
                    Login
                  </Button>
                </div>
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
                  onBlur={formik.handleBlur} // Handles validation on blur
                  isInvalid={!!(formik.errors.name && formik.touched.name)}
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
                  onBlur={formik.handleBlur} // Handles validation on blur
                  isInvalid={!!(formik.errors.email && formik.touched.email)}
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
                  onBlur={formik.handleBlur} // Handles validation on blur
                  isInvalid={!!(formik.errors.password && formik.touched.password)}
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
                  onBlur={formik.handleBlur} // Handles validation on blur
                  isInvalid={!!(formik.errors.confirmPassword && formik.touched.confirmPassword)}
                  value={formik.values.confirmPassword}
                  errorMessage={formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : ""}
                />
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
export default AccountForm