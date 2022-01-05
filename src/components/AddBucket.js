<<<<<<< HEAD
import { useState } from "react";
const AddBucket = () => {
    const [bucket, setBucket] = useState("");
    //const [tag, setTag] = useState("");
    //const [tagArr, setTagArr] = useState([]);
    //ë²„í‚·ë‚´ìš©
    const onSubmit = (event) => {
        event.preventDefault();
    };
    const onChange = (event) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setBucket(value);
    };
    //íƒœê·¸ë“±ë¡
    /*const onChangeTag = (event) => {
        event.preventDefault();
        const {

        }
    }*/
    return (
        <div className="AddBucket">
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="ê¿ˆê¾¸ëŠ” ì¼ì´ ìžˆë‚˜ìš”?"
                    maxLength={400}
                    value={bucket}
                    onChange={onChange}
                />
                <input type="submit" value="ðŸª„" />
            </form>
            <button>Cancel</button>
        </div>
=======

const AddBucket = () => {
    return (
        <>
            <div className="AddBucket">
                <h1>Á¦¸ñ</h1>
                <form>
                    <input placeholder="³»¿ëÀ» ÀÔ·ÂÇÏ¼¼¿ä" />
                    <input type="submit" />
                </form>
                <button>Cancel</button>
            </div>
        </>
>>>>>>> 4f7511663e7d3db393dafbebe388518c2ea9f6eb
    );
};

export default AddBucket;
