import React from "react";

export default function OperatorMail() {
  const email = "contact@morgt.ch";

  return <a href={`mailto:${email}`}>{email}</a>;
}
