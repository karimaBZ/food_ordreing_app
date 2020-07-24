import React from "react";

const CardSection = (props) => {
  return (
    <>
      <fieldset style={{ border: "none" }}>
        <div className="form-row">
          <div className="order-button-wrapper">
            <button onClick={props.submitOrder}>Confirm order</button>
          </div>
          <div id="card-errors" role="alert" />
        </div>
      </fieldset>
      <style jsx>
        {`
          .order-button-wrapper {
            display: flex;
            width: 100%;
            align-items: flex-end;
            justify-content: flex-end;
          }
        `}
      </style>
    </>
  );
}
export default CardSection;