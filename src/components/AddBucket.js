<<<<<<< HEAD
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
=======

const AddBucket = () => {
    return (
        <>
            <div className="AddBucket">
                <h1>����</h1>
                <form>
                    <input placeholder="������ �Է��ϼ���" />
                    <input type="submit" />
                </form>
                <button>Cancel</button>
            </div>
        </>
>>>>>>> 4f7511663e7d3db393dafbebe388518c2ea9f6eb
    );
};

export default AddBucket;
