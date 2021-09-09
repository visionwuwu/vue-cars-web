import SvgIcon from 'comps/SvgIcon/index.vue'

/* eslint-disable */ 
export default (app: any): void => {
  app.component(SvgIcon.name, SvgIcon)
  const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)
  const req = require.context('./svg', false, /\.svg$/)
  requireAll(req)
}
