import Manage from '@/mongoose/manage.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default defineEventHandler(async (event) => {
	const { operation, data } = await readBody(event);

	if (operation === 'login') {
		const { id, pw } = data;

		// const user = await Manage.findOne({ id: id });

		const user = { id: 'bdot1', pw: '$2y$10$gqJViWT3c9xfdCmtykzSiOi0TX/4TdCCgvtKw7NVvwoIbD1J.GdlG' };

		if (user && (await bcrypt.compare(pw, user.pw))) {
			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

			setCookie(event, 'access_token', token, {
				path: '/',
				sameSite: true,
				httpOnly: true,
			});
			return { success: true, id: id };
		} else {
			return { success: false };
		}
	}

	if (operation === 'logout') {
		setCookie(event, 'access_token', '', {
			maxAge: -1,
			path: '/',
			sameSite: true,
			httpOnly: true,
		});
		return { success: true };
	}
});
