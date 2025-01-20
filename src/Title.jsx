import { useEffect, useState } from "react"
import Cookies from 'js-cookie'

export default (prop) => {
    try {
        let userInfo = JSON.parse(atob(Cookies.get('user')))
        let name = `${userInfo.first_name} ${userInfo.last_name}`

        const [title, setTitle] = useState(`Hi welcome '${name}'`)

        useEffect(() => {
            if (Cookies.get('login') != undefined) {
                setTitle('Hi')
                setTimeout(() => {
                    for (let index = 0; index < title.length; index++) {
                        setTimeout(() => {
                            setTitle(title.substring(0, index + 1) + '_')
                            if (title.length - 1 < index + 1) {
                                setTitle(title.substring(0, index + 1))
                            }
                        }, index * 80);
                    }
                }, 700)
            }
        }, []);

        return <>
            <h2>{title}</h2>
        </>
    } catch (error) {
        console.error(error)
        return <>
       <p>some error</p>
        </>
    }

}