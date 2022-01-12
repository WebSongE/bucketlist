import { dbService, storageService } from "fbase";
import { useState } from "react";

const ShowList=({ bucketObject }) => {
    const [edit, setEdit] = useState(false);
    const [newBucket, setNewBucket] = useState(bucketObject.text);
    const onClickDelete = (event) => {
        const confirm = window.confirm("�����Ͻðڽ��ϱ�?");
        if (confirm) {
            await dbService.doc('buckets/${bucketObject.id}').delete();
        }
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewBucket(value);
    };
    const isEditing = () => setEdit((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc('buckets/${bucketObject.id}').update({ text: newBucket });
        setEdit(false);
    };
    return (
        <section>
            {edit ? (
                <div>
                    <form onSubmit={onSubmit}>
                        <input onChange={onChange} value={newBucket} required placeholder="���� ����" autoFocus />
                        <input type="submit" value="������Ʈ" />
                    </form>
                    <button type="button" onClick={isEditing}>���</button>
                </div>
            ) : (
                <div>
                    <h3>{bucketObject.text}</h3>
                    <div>
                        <span onClick={onClickDelete}>X</span>
                        <span onClick={isEditing}>O</span>
                    </div>
                </div>
            )}
        </section>
    );
}

export default ShowList;