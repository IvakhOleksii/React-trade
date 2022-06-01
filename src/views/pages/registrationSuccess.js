import React from "react";
import { Container } from "react-bootstrap";
import GetRegistered from "../../components/getRegistered";
import Footer from "../_partials/footer";
import NavBar from "../_partials/navbar";

function RegistrationSuccess(props) {
  const {
    history: {
      location: {
        state: { userType, userName },
      },
    },
  } = props;

  return (
    <div>
      <NavBar {...props} />
      <Container className="registration-success-container">
        {userType === "Car Dealer" ? (
          <div className="d-flex justify-content-center align-items-center section-contact-t-b-padding row">
            <h2>
              <strong>Your account is under review</strong>
            </h2>
            <p>Dear {userName},</p>
            <p>
              Thank you for your registration! Please wait until our admin
              approves your account. You will receive an email from us when the
              approval is done. It may take a while. You are unable to sign in
              until your account is approved.
            </p>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center section-contact-t-b-padding row">
            <h2>
              <strong>Thank you for registering with TraderSell!</strong>
            </h2>
            <p>
              To complete the registration process, please check your email for
              a time-sensitive link to activate your account.
            </p>
            <p>This link expires in a week.</p>
            <p>
              We’re happy to have you join our network! If you have any
              questions, please don't hesitate to contact us.
            </p>
            <p>Thank you,</p>
            <p>The TraderSell Team</p>
          </div>
        )}
      </Container>
      <GetRegistered {...props} />
      <Footer {...props} />
    </div>
  );
}

export default RegistrationSuccess;
