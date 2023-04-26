import { useState } from "react";

const usePasswordToggle = () => {
    const [visible, setVisibility] = useState(false);
    const icon =<FontAwesomeIcon icon={faEyeSlash} />

    const inputType = visible ? 'text' : 'password';

    return[icon, inputType];
}


export default usePasswordToggle;