FROM node:20-alpine as build

# 創建工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm ci

# 複製源碼
COPY . .

# 構建應用
RUN npm run build

# 生產階段使用輕量級 nginx 鏡像
FROM nginx:alpine

# 複製 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 複製構建結果到 nginx 目錄
COPY --from=build /app/dist /usr/share/nginx/html/

# 設置容器對外暴露的端口
EXPOSE 80

# 啟動 nginx
CMD ["nginx", "-g", "daemon off;"]