import { Image, Text, View } from "react-native"
import { IUserInfo } from "./type";
import CustomImg from "../../CustomImg";

const UserInfo = ({ data }: { data: IUserInfo }) => {
    return (
        <View>
            <Text>{data.name}</Text>
            <CustomImg img={data.img} />
        </View>
    )
}

export default UserInfo;