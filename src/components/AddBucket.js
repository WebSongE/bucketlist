import { useEffect, useState } from "react";

const AddBucket = () => {
    const [newBucket, setNewBucket] = useState("");
    const [tags, setNewTags] = useState("");
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
        await dbService.collection("buckets").add({
            text: newBucket,
            dateAt: Date.now(),
            userId: user.uid,
        });
        setNewBucket("");
        setNewTags("");
    };
    return (
        <section>
            <div className="AddBucket">
                <form onSubmit={onSubmit}>
                    <input value={newBucket} type="text" onChange={onChange} placeholder="�̷����� ���� �������!" />
                    <input type="submit" />
                    <input value={tags} type="text" onChange={onChangeTags} placeholder="'#', ',' ,' ' ���� �±׸� �߰��� �� �ֽ��ϴ�"/>
                </form>
                <button type="button">Cancel</button>
            </div>
        </section>
    );
};

export default AddBucket;