import React from "react";
import Logo from "../../Components/Logo/Logo";
import "./Home.scss";

export default function Home({ user }) {
  const loginDate = user && user.active && new Date(parseInt(user.active));
  return (
    <div>
      <Logo />
      {user.name && (
        <p className="welcome-user">
          Welcome back, {user.name}.<br />
          Account type: "{user.type}"<br />
          Permissions: "{user.permissions}"<br />
          Login time: {loginDate.toString()}
        </p>
      )}
      <p className="company-description">
        Please note that while this was designed as a full-stack app with a
        postgres user database, the deployed version is just the front-end. You
        can{" "}
        <a href="https://github.com/scotteratigan/deck.gl-demo">
          view the source code
        </a>{" "}
        for the full app.
      </p>
      <p className="company-description">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores,
        delectus veritatis dolorum, asperiores odit blanditiis reiciendis sequi
        dolore cum temporibus ab suscipit, eveniet possimus. Reiciendis libero
        natus expedita id at.
      </p>
      <p className="company-description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
        itaque placeat facilis veniam tenetur! Lyt sit bonum societatis. Ipsa ab
        quia natus sint quas doloribus quasi aliquam inventore est
        necessitatibus, possimus facere, saepe exercitationem.
      </p>
      <p className="company-description">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
        mollitia consectetur ratione impedit aspernatur, repellendus sequi autem
        tenetur dicta ipsa eveniet, in error ut aut dolores, quae quaerat
        deserunt vitae! Terribilis est negotiationis omnia et faceret ea faciunt
        meliorem.
      </p>
    </div>
  );
}
