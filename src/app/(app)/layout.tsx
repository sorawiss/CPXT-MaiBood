import NavBar from "@/components/NavBar"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="ChildWrapper pb-[4rem]">
        {children}
      </div>
      <NavBar />
    </div>
  )
}
export default Layout