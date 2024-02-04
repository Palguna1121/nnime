import axios from "axios";
import Header from "../../../components/List/Header";
import { searchAnimeQuery } from "../../../helper/searchQueryStrings";
import SearchList from "../../../components/List/Search/SearchList";

const Page = async ({ params }) => {
  const { keyword } = params;
  const decodeKeyword = decodeURI(keyword);

  let res = await axios({
    url: process.env.NEXT_PUBLIC_BASE_URL,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: {
      query: searchAnimeQuery,
      variables: {
        search: decodeKeyword,
      },
    },
  }).catch((err) => {
    console.log(err);
  });
  let searchNime = res.data.data.Page;

  return (
    <>
      <section className="m-5 pb-8">
        {searchNime ? (
          <>
            <Header title={`Hasil Pencarian : ${decodeKeyword}`} />
            <SearchList api={searchNime} />
          </>
        ) : (
          <Header title={`Hasil Pencarian : ${decodeKeyword} Tidak Ditemukan`} />
        )}
      </section>
    </>
  );
};

export default Page;
