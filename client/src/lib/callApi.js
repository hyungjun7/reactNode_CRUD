//글 목록을 받아오거나 서버에 요청을 보내 어떤 상태값을 가져올 때 사용할 함수
const callApi = async(path, setList) => {
    const res = await fetch(path);
    await res.json()
      .then((data) => {
        setList(data);
      })
      .catch((err) => {
        console.log(err);
        return alert('목록 불러오기를 실패했습니다.');
      });
  }

export default callApi;