
class UsersRepository {
	constructor( User ) {
		this.userModel = User;
	}

	insertUser = async ( userEmail ) => {
			try {
					const result = await this.userModel.create({
						email : userEmail,
						status : 'N',
					});
					return result;
			} catch ( error ) {
				console.error(error);
				return { errorMessage:error.message };
			}
		};

	findUser = async ( userEmail ) => {
		// 해당 이메일로 된 모든 레코드를 찾습니다.
		const findUser = await this.userModel.findAll({
			where : {
				email : userEmail,
			},
		});

		const hasNStatus = findUser.some(( user ) => user.status === 'N');

		if ( hasNStatus ) {
			// 이미 'N'인 상태가 하나라도 있는 경우 메시지를 반환합니다.
			return { errorMessage : '작업중인 사진이 있습니다.' };
		}
		return findUser;
	};

	getUser = async ( userEmail ) => {
		// 해당 이메일로 된 모든 레코드를 찾습니다.
		return await this.userModel.findAll({
			where : {
				email : userEmail,
				status : 'Y',
			},
		});
	}

}

module.exports = UsersRepository;