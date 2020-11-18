const callApi = async(path, setList) => {
    const res = await fetch(path);
    await res.json()
      .then((data) => {
        setList(data);
      })
      .catch((err) => {
        return alert('목록 불러오기를 실패했습니다.');
      });
  }

export default callApi;