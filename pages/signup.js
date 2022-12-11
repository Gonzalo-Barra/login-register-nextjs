import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Signup() {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        name: "",
        lastname: "",
        email: "",
        password: "",
        role: "",
        sex: "",
        termsUser: false,
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Requerido"),
        lastname: Yup.string().required("Requerido"),
        email: Yup.string().email("Correo no válido").required("Requerido"),
        password: Yup.string().required("Requerido"),
        role: Yup.array().oneOf(["user","seller"],  "Solo puedes elegir una opción").required(),
        sex: Yup.array().oneOf(["male","female"], "Solo puedes elegir una opción").required(),
        termsUser: Yup.boolean().oneOf([true], "Debe aceptar los términos"),
      })}
      onSubmit={async (values) => {
        axios({
          method: "POST",
          url: "https://c8-43-m-mern-api.vercel.app/auth",
          data: {
            name: values.name,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
            role: values.role,
            sex: values.sex,
            termsUser: values.termsUser,
          },
        })
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
              alert("Usuario Creado");
              return router.push("/");
            } else if (res.error) {
              alert("Usuario ya registrado");
            }
          })
          .catch((res) => {
            alert("Usuario ya registrado");
          });
      }}
    >
      <div className="bg-[#1B5B45] grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[0.2fr_1fr_0.2fr_1fr] gap-4 h-full place-items-center">
        <img
          className=" col-start-2 col-end-4  pt-16 mx-1"
          src="/img/logo2.png"
          width="300"
          height="300"
          alt="logo"
        />
        <Form className="gap-0 col-start-2 col-end-4 row-start-2">
          <div className="formulario__nombre flex justify-between items-center m-0">
            <div className="flex flex-col m-0 py-4 ">
              <label htmlFor="name" className="text-white text-sm font-medium">
                Nombre
              </label>
              <Field
                className="shadow-2xl  bg-[#F4F0BB]  text-black rounded-md py-1"
                type="text"
                name="name"
              />
            </div>
            <ErrorMessage name="name" />
            <div className="flex flex-col col-start-3 col-end-4">
              <label
                className="text-white  text-sm font-medium"
                htmlFor="lastname"
              >
                Apellido
              </label>
              <Field
                className="shadow-2xl  bg-[#F4F0BB] text-black  rounded-md py-1"
                type="text"
                name="lastname"
                required
              />
            </div>
            <ErrorMessage name="lastname" />
          </div>

          <div className="formulario__email col-start-2 col-end-4  py-1">
            <label className="text-white" htmlFor="email">
              Email
            </label>
            <Field
              className="shadow-2xl bg-[#F4F0BB]  text-black  rounded-md w-full py-1"
              type="email"
              name="email"
            />
            <ErrorMessage name="email" />
          </div>
          <div className="formulario__contrasena flex justify-between items-center py-6 ">
            <div className="flex flex-col m-0">
              <label htmlFor="password" className="text-white">
                Contraseña
              </label>
              <Field
                className=" shadow-2xl bg-[#F4F0BB] text-black  rounded-md py-1"
                type="password"
                name="password"
              />
              <ErrorMessage name="password" />
            </div>
            {/*           
          <div className="m-0">
            <label htmlFor="password" className="text-white flex flex-col">
              Confirmar contraseña
            </label>
            <input
              className=" shadow-2xl bg-[#F4F0BB]  rounded-md py-1"
              type="password"
              id="password"
              name="password"
              required
              value={inputs.password || ""}
              onChange={handleChange}
            />
          </div> */}
          </div>

          <div className="flex flex-col">
            <div className="text-center text-white">¿Qué te gustaría hacer</div>
            <br />
            <div className="py-5 px-4 flex">
              <div role="group" aria-labelledby="checkbox-group">
                <label htmlFor="role" className="text-white">
                  Promover y diseñar productos
                </label>
                <Field
                  className="px-4"
                  type="checkbox"
                  name="role"
                  value="seller"
                />
                <label htmlFor="role pl-8" className="text-white">
                  Ver y comprar diseños únicos
                </label>
                <Field
                  className="px-4"
                  type="checkbox"
                  name="role"
                  value="user"
                />
                 <ErrorMessage  name="role" /> 
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-center text-white">¿Cuál es tu género</div>
            <br />
           
              <div role="group" className="px-4 flex"aria-labelledby="checkbox-group">
                <label htmlFor="sex" className="text-white">
                  Hombre
                </label>
                <Field
                  className="px-4"
                  type="checkbox"
                  name="sex"
                  value="male"
                />
                <label htmlFor="sex" className="text-white">
                  Mujer
                </label>
                <Field
                  className="px-4"
                  type="checkbox"
                  name="sex"
                  value="female"
                />
              </div>
              <br />
             
            </div>
            <ErrorMessage  name="sex" /> 
          

          <div>
            <label className=" text-white py-8">
              <Field type="checkbox" name=" termsUsers" />
              He leído y estoy de acuerdo con las políticas de privacidad.
              (*requerido)
            </label>
            <br />
            <ErrorMessage name="acceptedTerms" />
            <br />

            <label className=" text-white pb-12">
              <Field type="checkbox" name="Subscribe" />
              Suscribirse para recibir información especial sobre Valen vía
              email.
            </label>
          </div>
          <button
            className="  col-start-2 col-end-4 w-full shadow-2xl bg-[#F4F0BB] text-[#1B5B45]  rounded-md py-2 mt-10"
            type="submit"
          >
            Crear cuenta
          </button>
        </Form>
      </div>
    </Formik>
  );
}
