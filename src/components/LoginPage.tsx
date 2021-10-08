import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { Context } from "../index";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useHistory } from "react-router";

interface Props {}

const LoginPage = (props: Props) => {
  const { auth } = useContext(Context);
  const history = useHistory();

  const login = async () => {
    console.log(auth);
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    history.push("/map");
  };

  return (
    <div className="container-fluid h-100">
      <div className="row h-80 justify-content-center align-items-center">
        <Button
          variant="outline-primary"
          style={{ width: "auto" }}
          onClick={login}
        >
          <img
            alt="logo"
            src={`${process.env.PUBLIC_URL}/GoogleLogo.svg`}
            style={{ transform: "translate(-3px, -1px)" }}
          />
          Войти через Google
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
