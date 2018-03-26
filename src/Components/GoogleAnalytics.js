import * as React from 'react';
import * as Scrivito from 'scrivito';
import Helmet from 'react-helmet';

class GoogleAnalytics extends React.Component {
  constructor(props) {
    super(props);

    this.state = { trackingId: '' };
    this.state = { optimizeId: '' };
  }

  componentDidMount() {
    Scrivito.load(() => this.getTrackingId()).then(trackingId => {
      if (trackingId) {
        window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
        window.ga('create', trackingId, 'auto');
        window.ga('set', 'anonymizeIp', true);
        window.ga('require', 'urlChangeTracker');
        window.ga('send', 'pageview');

        this.setState({ trackingId });
      }
      Scrivito.load(() => this.getOptimizeId()).then(optimizeId => {
        if (optimizeId) {
          window.ga('require', optimizeId);

          this.setState({ optimizeId });
        }
      });
    });
  }

  render() {
    if (!this.state.trackingId) {
      return null;
    }

    return (
      <Helmet>
        <script async src='/google_analytics.js'></script>
        <script async src='https://www.google-analytics.com/analytics.js'></script>
      </Helmet>
    );
  }

  getTrackingId() {
    const rootPage = Scrivito.Obj.root();

    if (!rootPage) {
      return;
    }

    return rootPage.get('googleAnalyticsTrackingId');
  }

  getOptimizeId() {
    const rootPage = Scrivito.Obj.root();

    if (!rootPage) {
      return;
    }

    return rootPage.get('googleOptimizeId');
  }
}

export default Scrivito.connect(GoogleAnalytics);
