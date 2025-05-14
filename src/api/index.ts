import assetApi from './assets/AssetApi';
import institutionApi from './institutions/InstitutionApi';
import cashFlowApi from './cashFlow/CashFlowApi';
import commonApi from './common/CommonApi';

export default {
  common: {
    ...commonApi,
  },
  assets: {
    ...assetApi,
  },
  institutions: {
    ...institutionApi,
  },
  cashFlow: {
    ...cashFlowApi,
  },
}
