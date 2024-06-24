import React, { useEffect, useState } from 'react'
import xmark from '../../../assets/icons/xmark.svg'
import { Editor } from '@tinymce/tinymce-react';

function Subtopic({ setTopics, topicIndex, subtopic, setShowModal,subIndex }) {
  console.log( topicIndex, subtopic)
  const [subTopic, setSubTopic] = useState([]);
  const [subTopicDesc, setSubTopicDesc] = useState([]);

  const saveSubtopic = () => {
    setTopics((prevTopics) => {
      const newTopics = [...prevTopics];
      const updatedTopic = { ...newTopics[topicIndex] };
      updatedTopic.subtopics.push({
        name: subTopic, // Replace with your actual key1 and value1
        content: subTopicDesc, // Replace with your actual key2 and value2
      });
      newTopics[topicIndex] = updatedTopic;

      // newTopics[topicIndex].subtopics.push(subtopic);
      return newTopics;
    });
    setShowModal(false);
  };


  const escFunction = (event) => {
    if (event.key === "Escape") {
      setShowModal(false)
    }
  }
  useEffect(() => {
    document.getElementById('modal').showModal();
    return () => {
      document.addEventListener("keydown", escFunction, false);
    }

  }, [])

  return (

    <dialog id="modal" className="modal ">
      <div className="modal-box">
        <div className="modal-action ">
          <div
            className="justify-center w-full items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                <div className="flex items-start justify-between p-5">
                  <h3 className="text-xl font-semibold">
                    Add Sub topics Details
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 float-right  leading-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <img src={xmark} alt="xmark" className='w-5 h-5' />
                  </button>

                </div>
                <div className='flex items-start justify-between px-5'>
                  <h4 className='text-xl text-gray-500'>{subtopic}</h4>
                </div>
                <form>

                  <div className="flex items-start justify-between mt-5 px-5">
                    <label htmlFor='Sub Topic' className='font-semibold text-lg text-gray-500'>Sub Topic</label>

                  </div>
                  <div className="flex w-full items-start justify-between px-5">
                    <input
                      type="text"
                      className='w-[50%] p-2 border border-gray-300 rounded-md'
                      required
                      placeholder='Enter the name of the sub topic'
                      onChange={(e) => setSubTopic(e.target.value)}
                    />
                  </div>
                  <div className="flex items-start justify-between mt-5 px-5">
                    <label htmlFor='SubTopicDesc' className='font-semibold text-lg text-gray-500'>Sub Topic Desc</label>

                  </div>
                  <div className="flex w-full items-start justify-between px-5">


                    <Editor
                      apiKey='yt4psixdarlldji11wwxwqlnkky6wk0zvsnwscxf8en1a30h'
                      initialValue="<p>Start Writing ... </p>"
                      init={{
                        height: 500,
                        menubar: true,
                        branding: false,
                        plugins: [
                          'advlist autolink lists link image charmap print preview anchor',
                          'searchreplace visualblocks code fullscreen',
                          'insertdatetime media table paste code help wordcount',
                          'formatpainter textcolor emoticons pagebreak hr spellchecker',
                          'table imagetools media file'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                          'bold italic backcolor forecolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help | ' +
                          'link image media | table | formatpainter | ' +
                          'emoticons charmap | fontsizeselect fontselect | ' +
                          'spellchecker | pagebreak hr fullscreen | code | ' +
                          'inserttable tableprops tabledelete | tableinsertrowbefore tableinsertrowafter ' +
                          'tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',


                        image_title: true,
                        automatic_uploads: true,
                        file_picker_types: 'image',
                        file_picker_callback: function (cb, value, meta) {
                          var input = document.createElement('input');
                          input.setAttribute('type', 'file');
                          input.setAttribute('accept', 'image/*');

                          input.onchange = function () {
                            var file = this.files[0];
                            var reader = new FileReader();

                            reader.onload = function () {
                              var id = 'blobid' + (new Date()).getTime();
                              var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                              var base64 = reader.result.split(',')[1];
                              var blobInfo = blobCache.create(id, file, base64);
                              blobCache.add(blobInfo);

                              cb(blobInfo.blobUri(), { title: file.name });
                            };
                            reader.readAsDataURL(file);
                          };

                          input.click();
                        }
                      }}
                      onEditorChange={(content, editor) => setSubTopicDesc(content)}
                      />

                  </div>
                  <div className="flex items-center justify-end p-6">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cance
                    </button>
                    <button
                      className="bg-gray-500 text-gray-400 font-bold text-sm px-6 py-2 rounded-xl "
                      type="button"
                      onClick={() => saveSubtopic()}
                    >
                      Confirm
                    </button>

                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </dialog>

  )
}

export default Subtopic
