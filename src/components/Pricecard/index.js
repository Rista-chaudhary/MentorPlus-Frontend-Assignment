import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import "./style.css";

export default function (props) {
  const [countDown, setCountDown] = useState(0);
  const [formattedCountDown, setFormattedCountDown] = useState({});

  function checkCookie(cookieKey) {
    return document.cookie.indexOf(cookieKey);
  }

  function getCookie(cookieKey) {
    const _cookie = document.cookie;

    const cookieIndex = _cookie.indexOf(cookieKey);

    const cookieSubstring = _cookie.substring(cookieIndex);

    const cookieSplitArray = cookieSubstring.split(";");

    const cookieValue = cookieSplitArray[0].replace(cookieKey + "=", "");

    const cookieValueInt = parseInt(cookieValue);

    return cookieValueInt;
  }

  function getFormatedCountDown(timeInMillies) {
    const d = new Date();

    const seconds = Math.round(timeInMillies / 1000);

    const minutes = Math.round(seconds / 60);

    const hours = Math.round(minutes / 60);

    const days = Math.round(hours / 24);

    return { seconds, minutes, hours, days };
  }

  useEffect(() => {
    dayjs.extend(duration);

    const isCookieAvailable = checkCookie(props.item.planId) > -1;

    let finalCookieValue = 0;

    if (isCookieAvailable) {
      const mCookie = getCookie(props.item.planId);

      finalCookieValue = mCookie;
    } else {
      document.cookie = props.item.planId + "=" + props.initialTime;
      finalCookieValue = props.initialTime;
    }

    setCountDown(finalCookieValue);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (countDown > 0) {
        setCountDown(countDown - 1000);
        setFormattedCountDown(getFormatedCountDown(countDown));
      }
    }, 1000);
  }, [countDown]);

  return (
    <div
      className={"price-card-parent-div "}
      style={{ backgroundColor: props.item.backgroundColor }}
    >
      <div className="price-card-first-container">
        <div className="heading-one">
          <h1>
            <i>FLAT {props.item.save} OFF</i>
          </h1>
        </div>
        <div className="offer-and-booked-container">
          <div className="offer-closed-container">
            {countDown > 0 ? (
              <div
                className="offer-count-container"
                style={{ display: "flex", gap: "10px" }}
              >
                <div>
                  <div>{formattedCountDown.days}</div>
                  <div>days</div>
                </div>
                <div>
                  <div>
                    {formattedCountDown.hours && formattedCountDown.hours % 24}
                  </div>
                  <div>hrs</div>
                </div>
                <div>
                  <div>
                    {
                      formattedCountDown.minutes &&
                        formattedCountDown.minutes % 60
                      // dayjs
                      //   .duration({
                      //     seconds: formattedCountDown.seconds,
                      //     minutes: formattedCountDown.minutes,
                      //     hours: formattedCountDown.hours,
                      //     days: formattedCountDown.hours,
                      //   })
                      //   .format("D H mm ss")
                    }
                  </div>
                  <div>mins</div>
                </div>
                <div>
                  <div>
                    {formattedCountDown.seconds &&
                      formattedCountDown.seconds % 60}
                  </div>
                  <div>secs</div>
                </div>
              </div>
            ) : (
              <>
                <div class="offer-closed">Offer Closed</div>
                <div>Weekend Plan Booked 100% </div>
                <div>Within 20 Minutes</div>
              </>
            )}
          </div>
          <div className="booked-container">
            <div className="hund-per-div">100% </div>
            <div>closed</div>
          </div>
        </div>
      </div>
      <div className="price-card-sec-container">
        <div
          className="weekly-container"
          style={{ backgroundColor: props.item.offerColor }}
        >
          {" "}
          {props.item.saver}
        </div>

        <div className="practice-container">{props.item.heading}</div>

        <div className="live-value-container">
          <div>
            {props.item.content.map((con) => {
              return <div>{con}</div>;
            })}
          </div>
        </div>
        <div className="academic-projects-container">
          <div className="academic-sub-container">{props.item.suit}</div>
        </div>
        <div className="reffered-container">
          Flat {props.item.save} OFF for being referred by Saurabh
        </div>
        <div className="discounted-parent-container">
          <div className="discounted-price">{props.item.originalPrice}</div>

          <div className="save-percentage">Save {props.item.save}</div>
          <div className="total-price">{props.item.price}</div>
        </div>
      </div>
      <div className="booked-button-container">
        <button className="booked-status-container">100% Booked</button>
      </div>
    </div>
  );
}
