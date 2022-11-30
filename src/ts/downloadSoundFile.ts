import { API_URL } from './constants/constants'

export class DownloadSoundFile {
  private id: string | undefined;
  constructor (private button: HTMLButtonElement) {
    this.id = button.dataset.id
  }

  init () {
    this.button.onclick = () => {
      if (this.id) {
        this.button.disabled = true
        this.downloadFile().catch(e => console.error('Не предвиденная ошибка', e)).finally(() => {
          this.button.disabled = true
        })
      }
    }
  }

  async downloadFile () {
    const response = await fetch(`${API_URL}/download/download?id=${this.id}`)
    if (response.status === 200) {
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `sound-${this.id}.mp3`
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  }
}
