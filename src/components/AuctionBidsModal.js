import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BIDS_MODAL_ID } from "../redux/actions/app/appActions";
import APIConfig from "../helpers/api/config";
import formatCurrency from "../helpers/formatCurrency";
import Modal from "./Modal";
import Loader from "./loader";

function AuctionBidsModal() {
  const {
    auctionId,
    user: { name: userName },
  } = useSelector((state) => state.app);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: BIDS_MODAL_ID, value: null });
  };

  useEffect(() => {
    if (auctionId) {
      setLoading(true);
      axios(APIConfig("get", `/bidhistory/${auctionId}`, null))
        .then(({ data }) => {
          setData(data);
          setLoading(false);
        })
        .catch(console.error);
    }
  }, [auctionId]);

  return (
    <Modal title="Bid History" open={!!auctionId} handleClose={handleClose}>
      {loading ? (
        <Loader style={{ maxHeight: 250 }} />
      ) : (
        <table className="bids-modal-table">
          <thead>
            <tr className="bids-modal-header">
              <th>Dealer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Bid Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ bid_price, dealername, email, phone }) => {
              const isAnonymousDealer = dealername !== userName;

              return (
                <tr key={email} className="bids-modal-item">
                  <td>{isAnonymousDealer ? "Anonymous" : dealername}</td>
                  <td>
                    {isAnonymousDealer ? (
                      "Anonymous"
                    ) : (
                      <a href={`mailto:${email}`}>{email}</a>
                    )}
                  </td>
                  <td>{isAnonymousDealer ? "Anonymous" : phone}</td>
                  <td style={{ textAlign: "right" }}>
                    {formatCurrency(bid_price)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Modal>
  );
}

export default AuctionBidsModal;
