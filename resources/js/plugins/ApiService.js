import axios from "axios"
import VueAxios from "vue-axios"

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  static vueInstance

  /**
   * @description initialize vue axios
   */
  static init(app) {
    ApiService.vueInstance = app
    ApiService.vueInstance.use(VueAxios, axios)
    ApiService.vueInstance.axios.defaults.baseURL = "/api/v1/"
    ApiService.setHeader()
  }

  /**
   * @description set the default HTTP request headers
   */
  static setHeader() {
    if (localStorage.getItem('token')) {
      ApiService.vueInstance.axios.defaults.headers.common["Authorization"] = localStorage.getItem('token')
    }
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] = "application/json"
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  static get(url, queryParams = {}) {
    ApiService.setHeader()
    
    return ApiService.vueInstance.axios.get(url, { params: queryParams })
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  static post(resource, params) {
    ApiService.setHeader()
    
    return ApiService.vueInstance.axios.post(`${resource}`, params)
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  static update(resource, slug, params) {
    ApiService.setHeader()

    const url = resource + (slug != "" ? "/" + slug : "")
    
    return ApiService.vueInstance.axios.put(`${url}`, params)
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  static put(resource, params) {
    ApiService.setHeader()
    
    return ApiService.vueInstance.axios.put(`${resource}`, params)
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  static delete(resource) {
    ApiService.setHeader()
    
    return ApiService.vueInstance.axios.delete(resource)
  }

  static request(url, method, params) {
    ApiService.setHeader()

    const u = new URL(url)
    
    return ApiService.vueInstance.axios.request({
      method: method === 'post' ? 'post' : 'get',
      url: u.pathname + u.search,
      data: params,
      baseURL: u.origin,
    })
  }
}

export default ApiService
