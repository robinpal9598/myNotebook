import React from 'react'

const Change = () => {
  return (
    <div><div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <form style={{ "width": "400px", "margin": "auto", "border": "1px solid grey ", "padding": "20px 20px" }}>
                    <div className="mb-3" >
                        <label htmlFor="exampleInputEmail1" className="form-label"><h3>Title</h3></label>
                        <input type="text" className="form-control"  placeholder='Enter the title' value={title}  id="exampleInputEmail1" aria-describedby="text" />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3" >
                        <label htmlFor="exampleInputPassword1" className="form-label " ><h3>Description</h3></label>
                        <input type="text" onChange={(e) => { setDescription(e.target.value) }} placeholder='Enter the title' value={description} style={{ "height": "50px" }} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label"><h3>Tag</h3></label>
                        <input type="text" onChange={(e) => { setTag(e.target.value) }} placeholder='Enter the title' value={tag} className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>


            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div></div>
  )
}

export default Change