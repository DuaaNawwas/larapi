import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function Register() {
	const { user, setUser } = useContext(AuthContext);
	const [register, setRegister] = useState({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
		errors: [],
	});

	const navigate = useNavigate();

	const handleInput = (e) => {
		e.persist();
		setRegister({ ...register, [e.target.name]: e.target.value });
	};

	const handleRegistration = (e) => {
		e.preventDefault();

		const data = {
			name: register.name,
			email: register.email,
			password: register.password,
			password_confirmation: register.password_confirmation,
		};
		axios.get("/sanctum/csrf-cookie").then((response) => {
			axios.post("/api/register", data).then((res) => {
				if (res.data.status === "Request was successfull.") {
					console.log(res.data);
					localStorage.setItem("auth_token", res.data.data.token);
					localStorage.setItem("auth_name", res.data.data.user.name);
					const name = res.data.data.user.name;
					const email = res.data.data.user.email;
					setUser({ ...user, name, email });
					navigate("/", { replace: true });
				} else {
					console.log(res);
					setRegister({ ...register, errors: res.data.errors });
				}
			});
		});
	};

	return (
		<form className="w-1/2 mx-auto pt-10" onSubmit={handleRegistration}>
			<div className="relative z-0 mb-6 w-full group">
				<input
					type="text"
					name="name"
					id="floating_first_name"
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					required=""
					value={register?.name}
					onChange={handleInput}
				/>
				<label
					htmlFor="floating_first_name"
					className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Name
				</label>
				<span>{register.errors.name}</span>
			</div>
			<div className="relative z-0 mb-6 w-full group">
				<input
					type="email"
					name="email"
					id="floating_email"
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					required=""
					value={register?.email}
					onChange={handleInput}
				/>
				<label
					htmlFor="floating_email"
					className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Email address
				</label>
				<span>{register.errors.email}</span>
			</div>
			<div className="relative z-0 mb-6 w-full group">
				<input
					type="password"
					name="password"
					id="floating_password"
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					required=""
					value={register?.password}
					onChange={handleInput}
				/>
				<label
					htmlFor="floating_password"
					className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Password
				</label>
				<span>{register.errors.password}</span>
			</div>
			<div className="relative z-0 mb-6 w-full group">
				<input
					type="password"
					name="password_confirmation"
					id="floating_repeat_password"
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					required=""
					value={register?.password_confirmation}
					onChange={handleInput}
				/>
				<label
					htmlFor="floating_repeat_password"
					className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Confirm password
				</label>
			</div>

			<button
				type="submit"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Submit
			</button>
		</form>
	);
}
