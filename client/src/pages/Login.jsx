import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { auth, db, signInWithGooglePopup } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { SwalError, SwalSuccess } from "../components/Alert";

export default function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const newInput = {
      ...input,
    };

    newInput[name] = value;
    setInput(newInput);
  };

  const handleLoginEmail = async (event) => {
    event.preventDefault();
    try {
      const { email, password } = input;
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const currentUser = credential.user;

      (localStorage.uid = currentUser.uid),
        (localStorage.displayName = currentUser.displayName),
        (localStorage.photoUrl = "Untitled");
        localStorage.email = email
      localStorage.access_token = currentUser.accessToken;

      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      const { uid, displayName, email, photoURL, accessToken } = user;

      const addUser = await setDoc(
        doc(db, "Users", uid),
        {
          uid,
          displayName,
          email,
          photoURL,
        },
        { merge: true },
      );

      localStorage.uid = uid;
      localStorage.displayName = displayName;
      localStorage.photoURL = photoURL;
      localStorage.access_token = accessToken;

      console.log(user, "<<< DATA");
      SwalSuccess("Login successful", `Welcome ${displayName}`)
      navigate("/home");
    } catch (error) {
      SwalError(error);
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col md:grid md:grid-cols-2">
        <section className=" flex h-screen flex-col items-center justify-center bg-gray-800 text-white md:col-span-1">
          <form
            onSubmit={handleLoginEmail}
            className="flex w-3/5 flex-col gap-3"
          >
            <div className="md:text-md text-center text-3xl lg:text-4xl"></div>
            <h1 className="md:text-md text-center text-3xl lg:font-serif lg:text-5xl">
              Login
            </h1>
            <p className="mb-5 mt-7 text-sm lg:text-lg">
              <marquee>Please Input Your Own Information to Login</marquee>
            </p>
            <label className="text-sm lg:text-lg">Email :</label>
            <input
              className="input input-sm input-bordered w-full lg:input-md invalid:border-error invalid:text-error
                focus:invalid:border-error focus:invalid:ring-error"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
            />
            <label className="text-sm lg:text-lg">Password :</label>
            <input
              className="input input-sm input-bordered w-full lg:input-md"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
            <p className="lg:text-md text-end text-sm lg:hover:text-blue-500 lg:hover:underline">
              Forgot password?
            </p>
            <button className="btn btn-primary btn-sm lg:btn-md">Login</button>
            <div className="divider text-sm lg:text-lg">-- Or --</div>
            <button
              type="button"
              onClick={logGoogleUser}
              id="google-button"
              className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
            >
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  className="h-6 w-6"
                  viewBox="0 0 48 48"
                >
                  <defs>
                    <path
                      id="a"
                      d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                    />
                  </defs>
                  <clipPath id="b">
                    <use xlinkHref="#a" overflow="visible" />
                  </clipPath>
                  <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                  <path
                    clipPath="url(#b)"
                    fill="#EA4335"
                    d="M0 11l17 13 7-6.1L48 14V0H0z"
                  />
                  <path
                    clipPath="url(#b)"
                    fill="#34A853"
                    d="M0 37l30-23 7.9 1L48 0v48H0z"
                  />
                  <path
                    clipPath="url(#b)"
                    fill="#4285F4"
                    d="M48 48L17 24l-4-3 35-10z"
                  />
                </svg>

                <span className="ml-4">Log in with Google</span>
              </div>
            </button>
          </form>
          <div className="mt-5">
            <p className="text-start text-sm lg:text-lg">
              Doesn't Have an Account?{" "}
              <Link to={"/register"}>
                <button
                  //   to="/login"
                  className="link-hover text-sm text-primary lg:text-lg "
                >
                  Register
                </button>
              </Link>
            </p>
          </div>
        </section>
        <section className="hidden max-h-dvh bg-gray-900 bg-cover text-center text-white md:col-span-1 md:flex">
          <div className="carousel carousel-vertical flex h-full w-full text-center opacity-50">
            <div className="carousel-item relative h-full w-full">
              <img
                src="https://images.pexels.com/photos/2670898/pexels-photo-2670898.jpeg"
                className="w-full object-cover"
              />
            </div>
            <div className="carousel-item relative h-full w-full">
              <img
                src="https://images.pexels.com/photos/360912/pexels-photo-360912.jpeg"
                className="w-full object-cover"
              />
            </div>
            <div className="carousel-item relative h-full w-full">
              <img
                src="https://images.pexels.com/photos/54124/pexels-photo-54124.jpeg"
                className="w-full object-cover text-center"
              />
            </div>
            <div className="carousel-item relative h-full w-full">
              <img
                src="https://images.pexels.com/photos/1820563/pexels-photo-1820563.jpeg"
                className="w-full object-cover"
              />
            </div>
            <div className="carousel-item relative h-full w-full">
              <img
                src="https://images.pexels.com/photos/902756/pexels-photo-902756.jpeg"
                className="w-full object-cover"
              />
            </div>
            <div className="carousel-item relative h-full w-full">
              <img
                src="https://images.pexels.com/photos/20463592/pexels-photo-20463592/free-photo-of-the-cube.jpeg"
                className="w-full object-cover"
              />
            </div>
            <div className="carousel-item relative h-full w-full">
              <img
                src="https://images.pexels.com/photos/204946/pexels-photo-204946.jpeg"
                className="w-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
