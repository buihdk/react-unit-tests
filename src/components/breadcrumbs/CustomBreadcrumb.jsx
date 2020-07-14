import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const styles = {};

const { Item } = Breadcrumb;

const CustomBreadcrumb = ({ list }) =>
  list && (
    <Breadcrumb separator=">" className={styles.pb15}>
      {list.map(item => (
        <Item key={item}>
          {item.link ? (
            <Link to={item.link}>
              {item.icon} {item.pageName}
            </Link>
          ) : (
            item.pageName
          )}
        </Item>
      ))}
    </Breadcrumb>
  );

CustomBreadcrumb.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
};

CustomBreadcrumb.defaultProps = {
  list: [],
};

export default CustomBreadcrumb;
