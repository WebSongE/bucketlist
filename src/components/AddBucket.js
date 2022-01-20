import { useState } from "react";
import {dbService} from "fbase.js";

const AddBucket = ({userObject}) => {
    const [newBucket, setNewBucket] = useState("");
    const [tags, setNewTags] = useState("");
    const [tagArray,setTagArray]=useState([]);

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setNewBucket(value);
    }
    const onChangeTags = (event) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setNewTags(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (newBucket === "") return;
        setTagArray(tagArray.split("#"));
        await dbService.collection("buckets").add({
            text: newBucket,
            dateAt: Date.now(),
            userId: userObject.uid,
            tags: tagArray
        });
        setNewBucket("");
        setNewTags("");
    };
    return (
        <section>
            <div className="AddBucket">
                <form onSubmit={onSubmit}>
                    <input value={newBucket} type="text" onChange={onChange} placeholder="이루고싶은 일을 적어보세요!" />
                    <input type="submit" />
                    <input value={tags} type="text" onChange={onChangeTags} placeholder="공백없이 '#'으로 태그를 추가할 수 있습니다"/>
                </form>
                <button type="button">Cancel</button>
            </div>
        </section>
    );
};

export default AddBucket;