import React from "react";
import styles from "./Main.module.css";
import cardOneImg from "../../../assets/images/icons8-monitor-80.png";
import cardTwoImg from "../../../assets/images/icons8-diseño-80.png";
import cardTreeImg from "../../../assets/images/icons8-diseño-web-filled-80.png";
import { FormattedMessage, FormattedNumber } from "react-intl";

export default function Main() {
  let dataPrices = [0, 40, 70];
  let currency = "USD";

  return (
    <>
      <section className={styles.header_extradiv_Home_Page} id="about">
        <div className="container">
          <div className="row">
            <div
              className={
                styles.extra_div_Home_Page + " col-lg-4 col-md-4 col-12"
              }
            >
              <img src={cardOneImg} alt="Card img one" />
              <h2 className={styles.h2_main}>
                <FormattedMessage id="landing.main.benefits.title1" />
              </h2>
              <p>
                <FormattedMessage id="landing.main.benefits.description1" />
              </p>
            </div>
            <div
              className={
                styles.extra_div_Home_Page + " col-lg-4 col-md-4 col-12"
              }
            >
              <img src={cardTwoImg} alt="Card img two" />
              <h2 className={"work " + styles.h2_main}>
                <FormattedMessage id="landing.main.benefits.title2" />
              </h2>
              <p>
                <FormattedMessage id="landing.main.benefits.description2" />
              </p>
            </div>
            <div
              className={
                styles.extra_div_Home_Page + " col-lg-4 col-md-4 col-12"
              }
            >
              <img src={cardTreeImg} alt="Card img tree" />
              <h2 className={styles.h2_main}>
                <FormattedMessage id="landing.main.benefits.title3" />
              </h2>
              <p>
                <FormattedMessage id="landing.main.benefits.description3" />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.price} id="price">
        <div className="container text-center">
          <h2 className={"bold-font " + styles.h2_main}>
            <FormattedMessage id="landing.main.plans.title" />
          </h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className={"text-center " + styles.card}>
                <div className={styles.card_header}>
                  <FormattedMessage id="landing.main.plans.basic.title" />
                </div>
                <div className={styles.card_body}>
                  <span className={styles.value_price_Home_Page_free}>
                    <FormattedNumber
                      value={dataPrices[0]}
                      style={`currency`}
                      currency={currency}
                    />
                  </span>
                  /
                  <br />
                  <FormattedMessage id="landing.main.plans.basic.description" />
                </div>
              </div>
            </div>
            <div className={"col-lg-4 " + styles.card_second_Home_Page}>
              <div className={styles.card + " text-center"}>
                <div className={styles.card_header}>
                  <FormattedMessage id="landing.main.plans.standard.title" />
                </div>
                <div className={styles.card_body}>
                  <span
                    className={styles.value_price_Home_Page + " " + styles.free}
                  >
                    <FormattedNumber
                      value={dataPrices[1]}
                      style={`currency`}
                      currency={currency}
                    />
                  </span>
                  &nbsp;
                  <span className={styles.value_price_Home_Page_free}>
                    <FormattedMessage id="landing.main.plans.free.title" />
                  </span>
                  /
                  <br />
                  <FormattedMessage id="landing.main.plans.standard.description" />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className={styles.card + " text-center"}>
                <div className={styles.card_header}>
                  <FormattedMessage id="landing.main.plans.unlimited.title" />
                </div>
                <div className={styles.card_body}>
                  <span
                    className={styles.value_price_Home_Page + " " + styles.free}
                  >
                    <FormattedNumber
                      value={dataPrices[2]}
                      style={`currency`}
                      currency={currency}
                    />
                  </span>
                  &nbsp;
                  <span className={styles.value_price_Home_Page_free}>
                    <FormattedMessage id="landing.main.plans.free.title" />
                  </span>
                  /
                  <br />
                  <FormattedMessage id="landing.main.plans.unlimited.description" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
