import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";

export default function Signin() {
  const router = useRouter();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Correo no válido").required("Requerido"),
        password: Yup.string().required("Requerido"),
      })}
     	
		 onSubmit={async(values) => {
   
      axios({
          method: "POST",
          url: "https://c8-43-m-mern-api.vercel.app/auth/login",
          data: { email: values.email, password: values.password },
        }).then((res) => {
          console.log(res);
          if (res.status == 200) {
            return router.push("/");
          }
          else if(res.error) {
            alert("Usuario o contraseña incorrectos")
          }
        })
        .catch((res) => {
          alert("Usuario o contraseña incorrectos")
        });
      
      }}
    >
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] h-screen place-items-center bg-[#1B5B45]">
        <Form className=" rounded px-8 pt-6 pb-8 mb-4 col-start-2 col-end-4 row-start-2">
          <div>
            <label htmlFor="email" className="text-[#F4F0BB]">
              E-mail
            </label>
            <br />
            <Field
              className="shadow-2xl bg-[#F4F0BB] text-black rounded-md w-full py-2"
              name="email"
              type="email"
            />
            <ErrorMessage name="email" />
          </div>

          <br />
          <div>
            <label htmlFor="password" className="text-[#F4F0BB]">
              Contraseña
            </label>
            <br />
            <Field
              className="shadow-2xl bg-[#F4F0BB] text-black rounded-md w-full py-2"
              name="password"
              type="password"
            />
            <ErrorMessage name="password" />
          </div>

          <p className="text-white text-center py-4">
            ¿Olvidaste la contraseña?
          </p>
          <button
            className="shadow-2xl bg-[#F4F0BB]  rounded-md w-full py-2 my-4"
            type="submit"
          >
            Iniciar sesión
          </button>
          <Link href="/auth/signup">
            <button className="shadow-2xl bg-[#F4F0BB]  rounded-md w-full py-2">
              Crear una cuenta
            </button>
          </Link>
        </Form>
      </div>
    </Formik>
  );
};
