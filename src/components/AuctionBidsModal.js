import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BIDS_MODAL_ID } from "../redux/actions/app/appActions";
import useOutsideClick from "../hooks/useOutsideClick";
import APIConfig from "../helpers/api/config";
import formatCurrency from "../helpers/formatCurrency";
import Loader from "./loader";

function AuctionBidsModal() {
  const { auctionId } = useSelector((state) => state.app);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: BIDS_MODAL_ID, value: null });
  };

  useOutsideClick(ref, handleClose);

  useEffect(() => {
    if (auctionId) {
      setLoading(true);
      axios(APIConfig("get", `/bidhistory/${auctionId}`, null))
        .then(({ data }) => {
          setData([data[0], data[0], data[0], data[0], data[0]]);
          setLoading(false);
        })
        .catch(console.error);
    }
  }, [auctionId]);

  return auctionId ? (
    <div className="bids-modal-container">
      <div ref={ref} className="bids-modal-content">
        <div className="bids-modal-title bids-modal-header">
          <span>Bid History</span>
          <span className="bids-modal-close" onClick={handleClose}>
            X
          </span>
        </div>
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
              {data.map(({ bid_price, dealername, email, phone }) => (
                <tr key={email} className="bids-modal-item">
                  <td>{dealername}</td>
                  <td>
                    <a href={`mailto:${email}`}>{email}</a>
                  </td>
                  <td>{phone}</td>
                  <td style={{ textAlign: "right" }}>
                    {formatCurrency(bid_price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  ) : null;
}

export default AuctionBidsModal;
