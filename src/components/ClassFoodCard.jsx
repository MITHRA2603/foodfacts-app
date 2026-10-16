
import { Component } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';

class ClassFoodCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  componentDidMount() {
    console.log('ClassFoodCard mounted');
  }

  componentWillUnmount() {
    console.log('ClassFoodCard unmounted');
  }

  toggleBrand = () => {
    this.setState((previousState) => ({
      expanded: !previousState.expanded,
    }));
  };

  render() {
    const { food } = this.props;

    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">
            {food?.product_name || 'Unknown food'}
          </Typography>

          {this.state.expanded && (
            <Typography color="text.secondary">
              Brand: {food?.brands || 'Not available'}
            </Typography>
          )}

          <Button onClick={this.toggleBrand}>
            {this.state.expanded ? 'Hide Brand' : 'Show Brand'}
          </Button>
        </CardContent>
      </Card>
    );
  }
}

export default ClassFoodCard;
