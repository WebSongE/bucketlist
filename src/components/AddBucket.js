
const AddBucket = () => {
    return (
        <>
            <div className="AddBucket">
                <h1>제목</h1>
                <form>
                    <input placeholder="내용을 입력하세요" />
                    <input type="submit" />
                </form>
                <button>Cancel</button>
            </div>
        </>
    );
};

export default AddBucket;
