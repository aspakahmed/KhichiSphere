from sqlalchemy.orm import Session

from app.repositories.user_repository import UserRepository
from app.schemas.user import UserRegister, UserLogin
from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token,
)


class UserService:

    @staticmethod
    def register_user(db: Session, user: UserRegister):

        existing_user = UserRepository.get_by_email(db, user.email)

        if existing_user:
            raise ValueError("Email already registered")

        password_hash = hash_password(user.password)

        return UserRepository.create(
            db=db,
            full_name=user.full_name,
            email=user.email,
            password_hash=password_hash,
        )

    @staticmethod
    def login_user(
        db: Session,
        user: UserLogin
    ):
        existing_user = UserRepository.authenticate(
            db,
            user.email
        )

        if not existing_user:
            raise ValueError("Invalid email or password")

        if not verify_password(
            user.password,
            existing_user.password_hash
        ):
            raise ValueError("Invalid email or password")

        token = create_access_token(
            {"sub": existing_user.email}
        )

        return {
            "access_token": token,
            "token_type": "bearer"
        }