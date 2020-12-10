import React from "react";
import "./HelpContent.css";

export default function HelpContent() {
  return (
    <main>
      <section className="container-help-page">
        <div className="bd-grid-as-help description-as-help-sec">
          <div className="container-tittle-help-page">
            <h1 className="text-help-center"> Página de ayuda</h1>
          </div>
          <div className="container-description-help-page">
            <p>
              Omicromio es una plataforma que permite a las instituciones
              ordenar las actividades enviadas por los estudiantes desde
              Telegram en tiempos de virtualidad. Nuestra plataforma permite
              crear una institución y agregar a todos los profesores que
              conformen la organización. Cada profesor debe tener un número
              telefónico y Telegram descargada en su celular. EL número que se
              ingrese a la plataforma debe ser el número al cual los estudiantes
              envían sus actividades. Luego de configurar la plataforma, las
              fotos enviadas por los estudiantes serán cargadas a la plataforma
              el profesor podrá calificarlas y visualizarlas de forma
              organizada, sencilla y fácil.{" "}
            </p>
          </div>
          <div className="container-section-help-page">
            <h2 className="subtext-help-center">
              ¿Cómo registro mi institución?
            </h2>
            <hr />
            <p>
              Para registrar a la institución dele click en la barra de
              navegación donde dice: Sign in. Será redirigido a la página de
              registro en donde se cuentan con 3 pasos para el registro.
              Información personal, donde debe ser ingresada la información del
              rector o principal. Posteriormente, en la información de la
              institución se debe ingresar la ubicación de la organización. Es
              decir la ciudad, el municipio, la vereda o el pueblo donde se
              encuentra. Por último pide el número celular del rector o
              principal.{" "}
            </p>
          </div>
          <div className="container-section-help-page">
            <h2 className="subtext-help-center">
              ¿Cómo registro a mis profesores?{" "}
            </h2>
            <hr />
            <p>
              Una vez creada la cuenta de la institución el rector podrá escoger
              el plan que desee, el cual varía dependiendo la cantidad de
              profesores que se cuenten en la institución. Posteriormente, el
              recto podrá agregar a sus maestros. Por cada maestro agregado se
              le dará un usuario y una constraseña que debe tener el profesor
              cuando quiera en la plataforma.{" "}
            </p>
          </div>
          <div className="container-section-help-page">
            <h2 className="subtext-help-center">
              ¿El número de celular tiene que ser el número personal de los
              profesores?
            </h2>
            <hr />
            <p>
              Depende de cada institución. Es aconsejable que sea un número
              distinto al número personal del profesor. Sin embargo, también
              puede usarse el número del profesor personal.{" "}
            </p>
          </div>
          <div className="container-section-help-page">
            <h2 className="subtext-help-center">
              ¿Cómo veo las actividades enviadas?
            </h2>
            <hr />
            <p>
              Cuando los estudiantes envían la foto con la actividad nuestra
              plataforma se encarga de recogerla y enviarla al dashboard de cada
              maestro. Por lo tanto, para visualizar las actividades solo el
              profesor debe ingresar a nuestra plataforma.{" "}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
