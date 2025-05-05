import assetApi from './assets/AssetApi';
import institutionApi from './institutions/InstitutionApi';
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
}
