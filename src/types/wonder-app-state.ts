import { WonderState } from "../store/reducers/wonder";
import { UserState } from "../store/reducers/user";
import { RegistrationState } from "../store/reducers/registration";

export default interface WonderAppState {
  user: UserState;
  wonder: WonderState;
  registration: RegistrationState;
}
