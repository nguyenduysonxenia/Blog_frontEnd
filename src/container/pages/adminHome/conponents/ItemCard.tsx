import React from 'react';
import PropTypes from 'prop-types';

function ItemCard(props: any) {
  return (
    <>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="card-item-cout">
          <div className="wrap_count_item bg-item_1">
            <i className="fas fa-user-tie"></i>
            <span>{props.views.countUser} User</span>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12 ">
        <div className="card-item-cout">
          <div className="wrap_count_item bg-item_2">
            <i className="fas fa-blog"></i>
            <span>{props.views.countPost} Post</span>
          </div>
        </div>
      </div>

    </>
  );
}

ItemCard.propTypes = {
  views: PropTypes.object.isRequired
};

export default ItemCard;
