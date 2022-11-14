import axios from "axios";
import React, { useContext, useEffect } from "react";

import { AuthContext } from "../context/AuthProvider";

export default function Home() {
	const token = localStorage.getItem("auth_token");

	const { user } = useContext(AuthContext);

	return <h1>Welcome, {user?.name}</h1>;
}
