import { useState } from "react";
const AddBucket = () => {
    const [bucket, setBucket] = useState("");
    //const [tag, setTag] = useState("");
    //const [tagArr, setTagArr] = useState([]);
    //버킷내용
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
    //태그등록
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
                    placeholder="꿈꾸는 일이 있나요?"
                    maxLength={400}
                    value={bucket}
                    onChange={onChange}
                />
                <input type="submit" value="🪄" />
            </form>
            <button>Cancel</button>
        </div>
    );
};

export default AddBucket;
