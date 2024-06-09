import { Image } from "react-native"
import { IImg } from "./type"
import { useLayoutEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const CustomImg = ({ img }: { img: IImg }) => {

    const [source, setSource] = useState<string>('')

    const getCacheImg = async (uri: string) => {
        try {
            const blob = await AsyncStorage.getItem(uri)
            if (blob !== null) {
                const parsedBlob = JSON.parse(blob)
                const data = JSON.parse(parsedBlob.__data)
                return data.toString()
            }
            return null
        } catch (error) {
            return null
        }
    }

    const cacheImg = async (uri: string) => {
        try {
            const res = await fetch(uri)
            const blob = await res.blob()
            await AsyncStorage.setItem(uri, JSON.stringify(blob))
        } catch (error) {
            return null
        }
    }

    const cleanCache = async (uri: string) => {
        try {
            await AsyncStorage.removeItem(uri)
        } catch (error) {
            console.log('Error', error)
        }
    }

    const fetchImage = async (uri: string) => {
        if (img.cache === 'only') {
            const cacheUri = await getCacheImg(uri)
            if (cacheUri !== null) {
                setSource(cacheUri)
            } else {
                await cacheImg(uri)
                setSource(uri)
            }
            return;
        }
        if (img.cache === 'delay') {
            const cacheUri = await getCacheImg(uri)
            if (cacheUri !== null) {
                setSource(cacheUri)
            } else {
                await cacheImg(uri)
                setSource(uri)
                setTimeout(() => {
                    cleanCache(uri)
                }, 5000)
            }
            return
        }
        setSource(uri)
    }

    useLayoutEffect(() => {
        fetchImage(img.uri)
    }, [img.uri])

    return (
        <Image
            source={{
                uri: source
            }}
            style={{
                width: '100%',
                height: 200
            }}
        />
    )
}

export default CustomImg