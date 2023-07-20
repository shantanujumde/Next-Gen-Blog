import { api } from "@components/utils/api";
import { useRef, useState } from "react";

const Contact = () => {
  const getAllContent = api.contact.getAll.useQuery({ limit: 100 });

  const trpcUtils = api.useContext();
  const [content, setContent] = useState<string>("");
  const updateContentRef = useRef<HTMLInputElement>(null);

  const createContact = api.contact.create.useMutation({
    onSuccess: (tweet) => {
      trpcUtils.contact.getAll.setData({ limit: 100 }, (oldData) => {
        if (oldData == null) return;

        return [...oldData, tweet];
      });
    },
  });

  const updateContact = api.contact.update.useMutation({
    onSuccess: (tweet) => {
      trpcUtils.contact.getAll.setData({ limit: 100 }, (oldData) => {
        if (oldData == null) return;

        return [
          ...oldData.filter((currTweet) => currTweet.id !== tweet.id),
          tweet,
        ];
      });
    },
  });

  const deleteContact = api.contact.delete.useMutation({
    onSuccess: (tweet) => {
      trpcUtils.contact.getAll.setData({ limit: 100 }, (oldData) => {
        if (oldData == null) return;

        return [...oldData.filter((currTweet) => currTweet.id !== tweet.id)];
      });
    },
  });

  const handleUpdate = (id: string, content: string | undefined) => {
    if (content) updateContact.mutate({ id, content });

    if (updateContentRef.current && updateContentRef.current.value)
      updateContentRef.current.value = "";
  };

  const handleCreate = (content: string) => {
    createContact.mutate({ content });
    setContent("");
  };

  const handleDelete = (id: string) => {
    deleteContact.mutate({ id });
  };

  return (
    <div className="border-grey-200 flex h-full w-full items-center justify-items-center border">
      <div className="flex w-1/2 justify-around">
        <input
          className="rounded-lg border border-black p-1 active:border-blue-950"
          placeholder="Add new item"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          className="hover:green-blue-400 mr-2 rounded-lg border bg-green-200 p-2 hover:text-white"
          onClick={() => handleCreate(content)}
        >
          Add
        </button>
      </div>
      <div className="">
        {getAllContent.data &&
          getAllContent.data.map((tweet) => {
            return (
              <div key={tweet.id} className="m-2 p-2">
                <p>id: {tweet.id}</p>
                <p>userId: {tweet.userId}</p>
                <p>createdAt: {tweet.createdAt.toString()}</p>
                <p>content: {tweet.content}</p>
                <>
                  <input
                    className="mr-2 rounded-lg border border-black p-1 active:border-blue-950"
                    ref={updateContentRef}
                    placeholder="Rename item"
                  />
                  <button
                    className="mr-2 rounded-lg border bg-blue-200 p-2 hover:border-blue-400 hover:text-white"
                    onClick={() =>
                      handleUpdate(tweet.id, updateContentRef.current?.value)
                    }
                  >
                    Rename
                  </button>
                </>
                <button
                  className="rounded-lg border bg-red-200  p-2 hover:border-red-400 hover:text-white"
                  onClick={() => handleDelete(tweet.id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Contact;
