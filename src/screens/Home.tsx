import { useState } from "react";
import { FlatList, SafeAreaView, Text, View, ListRenderItem, StyleSheet } from "react-native";
import UserInfo from "./components/UserInfo";
import { IUserInfo } from "./components/UserInfo/type";



function Home(): React.JSX.Element {

    const [userInfo, setUserinfo] = useState<IUserInfo[]>([
        {
            id: 0,
            name: 'Nick',
            img: {
                uri: 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
                cache: 'no'
            }
        },
        {
            id: 1,
            name: 'Jack',
            img: {
                uri: 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
                cache: 'delay'
            }
        },
        {
            id: 2,
            name: 'Sara',
            img: {
                uri: 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
                cache: 'only'
            }
        },
    ])

    const renderUserInfo: ListRenderItem<IUserInfo> = ({ item }) => {
        return (
            <UserInfo data={item} />
        )
    }

    return (
        <SafeAreaView>
            <FlatList
                style={styles.list}
                data={userInfo}
                renderItem={renderUserInfo}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 20
    }
})

export default Home;