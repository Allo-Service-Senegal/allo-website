import Hero from '@/components/home/Hero'
import Categories from '@/components/home/Categories'
import ServicesEnVedette from '@/components/home/ServicesEnVedette'
import PrestatairesRecommandes from '@/components/home/PrestatairesRecommandes'
import CommentCaMarche from '@/components/home/CommentCaMarche'
import Temoignages from '@/components/home/Temoignages'
import CTAPrestataire from '@/components/home/CTAPrestataire'
import DerniersArticles from '@/components/home/DerniersArticles'

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <ServicesEnVedette />
      <PrestatairesRecommandes />
      <CommentCaMarche />
      <Temoignages />
      <CTAPrestataire />
      <DerniersArticles />
    </>
  )
}
